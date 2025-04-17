const CustomTooltip = ({ feature }) => {
  if (!feature) {
    return <div>Informazioni non disponibili</div>;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid #cc0000',
        borderRadius: '4px',
        padding: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      }}
    >
      <h3
        style={{
          backgroundColor: '#cc0000',
          color: 'white',
          padding: '5px',
          margin: '-10px -10px 10px -10px',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
        }}
      >
        {feature.name || 'Nome non disponibile'}
      </h3>
      <table>
        <tbody>
          <tr>
            <td>Tipo:</td>
            <td>{feature.type || 'N/A'}</td>
          </tr>
          <tr>
            <td>Voltaggio:</td>
            <td>{feature.voltage ? `${feature.voltage} kV` : 'N/A'}</td>
          </tr>
          {feature.from && (
            <tr>
              <td>Da:</td>
              <td>{feature.from}</td>
            </tr>
          )}
          {feature.to && (
            <tr>
              <td>A:</td>
              <td>{feature.to}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTooltip;
