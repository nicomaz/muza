export default function createData(artist, similarArtists) {
  const nodes = [{ id: artist, group: 0 }];
  const links = [];

  similarArtists.forEach((similarArtist) => {
    nodes.push({ id: similarArtist.name, group: 1 });
    links.push({
      source: artist,
      target: similarArtist.name,
      value: similarArtist.match,
    });
  });

  return { nodes, links };
}
