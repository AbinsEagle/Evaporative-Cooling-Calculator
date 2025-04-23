document.getElementById('calcForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const T_surface = parseFloat(document.getElementById('temp_surface').value);
  const T_air = parseFloat(document.getElementById('temp_air').value);
  const RH = parseFloat(document.getElementById('rh').value) / 100;
  const Q_air = parseFloat(document.getElementById('airflow').value);
  const Q_water = parseFloat(document.getElementById('coolant_flow').value);
  const A_surface = parseFloat(document.getElementById('surface_area').value);
  const P_fan = parseFloat(document.getElementById('fan_power').value);
  const P_pump = parseFloat(document.getElementById('pump_power').value);

  const C = 25;
  const evap_rate = C * A_surface * (1 - RH) * Q_air * 60 * 1000; // g/hr
  const evap_rate_kg = evap_rate / 1000;
  const latent_heat_removed = evap_rate_kg * 2260; // kJ/hr
  const cooling_power = latent_heat_removed / 3.6; // W
  const total_power = P_fan + P_pump;
  const cop = cooling_power / total_power;
  const coolant_temp_drop = latent_heat_removed / (Q_water * 60 * 4.186); // °C
  const cooling_rate = latent_heat_removed / 60 / (Q_water * 4.186); // °C/min

  document.getElementById('result').innerHTML = `
    <p><strong>Evaporation Rate:</strong> ${evap_rate.toFixed(2)} g/hr</p>
    <p><strong>Latent Heat Removed:</strong> ${latent_heat_removed.toFixed(2)} kJ/hr</p>
    <p><strong>Cooling Power:</strong> ${cooling_power.toFixed(2)} W</p>
    <p><strong>Total Power Input:</strong> ${total_power.toFixed(2)} W</p>
    <p><strong>COP (Efficiency):</strong> ${cop.toFixed(2)}</p>
    <p><strong>Coolant Temp Drop:</strong> ${coolant_temp_drop.toFixed(2)} °C</p>
    <p><strong>Cooling Rate:</strong> ${cooling_rate.toFixed(2)} °C/min</p>
  `;
});
