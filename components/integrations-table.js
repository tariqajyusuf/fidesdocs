import data from "../pages/user-guides/integrations/saas-integrations/_meta.json";
delete data.index;

// Helper function to chunk data into groups of 4
const chunkData = (data, size) => {
  return Object.entries(data).reduce((acc, curr, index) => {
    if (index % size === 0) acc.push([]);
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);
};

export default function IntegrationsTable({ columns }) {
  // Chunk the data into groups of 4
  const chunkedData = chunkData(data, columns);

  return (
    <table>
      <tbody>
        {chunkedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map(([key, value]) => (
              <td key={key}>
                <a href={`/docs/user-guides/integrations/saas-integrations/${key}`} class="nx-text-primary-600 nx-underline nx-decoration-from-font [text-underline-position:from-font]">
                  <strong>{value}</strong>
                </a>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}