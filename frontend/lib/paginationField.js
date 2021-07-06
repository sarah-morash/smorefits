import { PAGINATION_QUERY } from '../components/Pagination';

const paginationField = () => ({
  keyArgs: false,
  read: (existing = [], { args, cache }) => {
    const { skip, first } = args;

    // Read the number of items on the page from the cache
    const data = cache.readQuery({ query: PAGINATION_QUERY });
    const count = data?._allProductsMeta?.count;
    const page = skip / first + 1;
    const pages = Math.ceil(count / first);

    // Check if we have existing items
    const items = existing.slice(skip, skip + first).filter((x) => x);

    // If there are items
    // AND there aren't enough items to satisfy how many were requested
    // AND we are on the last page
    // THEN JUST SEND IT
    if (items.length && items.length !== first && page === pages) {
      return items;
    }

    if (items.length !== first) {
      // We don't have any items, we must go to the network to fetch them
      return false;
    }

    // If there are items, just return them from the cache, and we don't need to go to the network
    if (items.length) {
      console.log(
        `There are ${items.length} in the cache! Gonna send them to Apollo`
      );
      return items;
    }

    return false; // fallback to network
  },
  merge: (existing, incoming, { args }) => {
    const { skip } = args;

    console.log(`Merging items from the network ${incoming.length}`);
    console.log(incoming);

    const merged = existing ? existing.slice(0) : [];
    for (let i = skip; i < skip + incoming.length; ++i) {
      merged[i] = incoming[i - skip];
    }
    console.log(merged);
    return merged;
  },
});

export default paginationField;
