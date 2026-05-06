import Table from "react-bootstrap/Table";

const ForecastTab = function (props) {
  const dati = props.foreArray;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="text-center">Ora</th>
            <th className="text-center">Clima</th>
            <th className="text-center">Temp</th>
            <th className="text-center">Pioggia</th>
          </tr>
        </thead>
        <tbody>
          {dati !== null &&
            dati.map((d) => {
              return (
                <tr
                  key={d.dt_txt}
                  className="text-center border-top  border-black "
                >
                  <td className="bg-secondary text-white p-0">
                    <p className="mt-3 mb-0">
                      {d.dt_txt.split(" ")[1].slice(0, 5)}
                    </p>
                  </td>
                  <td className="bg-secondary text-white p-0">
                    <img
                      src={
                        "https://openweathermap.org/img/wn/" +
                        d.weather[0].icon +
                        ".png"
                      }
                    />
                  </td>
                  <td className="bg-secondary text-white p-0">
                    <p className="mt-3 mb-0">{d.main.temp} °C</p>
                  </td>
                  <td className="bg-secondary text-white p-0">
                    <p className="mt-3 mb-0"> {d.pop} </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default ForecastTab;
