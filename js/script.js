const API = 'http://cnms-parking-api.net.uztec.com.br/api/v1';

async function fetchData(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`${API}/${endpoint}`, options);
  return res.json();
}

async function verSlots() {
  const data = await fetchData('slots');
  document.getElementById('slots').textContent = JSON.stringify(data, null, 2);
}

async function listarAtivos() {
  const data = await fetchData('active');
  document.getElementById('ativos').textContent = JSON.stringify(data, null, 2);
}

async function registrarEntrada() {
  const plate = document.getElementById('entradaPlaca').value.trim();
  const model = document.getElementById('entradaModelo').value.trim();
  if (!plate || !model) return alert('Preencha placa e modelo.');
  const data = await fetchData('entry', 'POST', { plate, model });
  document.getElementById('entrada').textContent = JSON.stringify(data, null, 2);
}

async function checkVeiculo() {
  const plate = document.getElementById('checkPlaca').value;
  const data = await fetchData(`check/${plate}`);
  document.getElementById('check').textContent = JSON.stringify(data, null, 2);
}

async function registrarSaida() {
  const plate = document.getElementById('saidaPlaca').value;
  const data = await fetchData(`exit/${plate}`, 'PATCH');
  document.getElementById('saida').textContent = JSON.stringify(data, null, 2);
}

async function cancelarRegistro() {
  const plate = document.getElementById('cancelarPlaca').value;
  const data = await fetchData(`cancel/${plate}`, 'DELETE');
  document.getElementById('cancelar').textContent = JSON.stringify(data, null, 2);
}

async function verTempo() {
  const plate = document.getElementById('tempoPlaca').value;
  const data = await fetchData(`time/${plate}`);
  document.getElementById('tempo').textContent = JSON.stringify(data, null, 2);
}

async function atualizarVeiculo() {
  const oldPlate = document.getElementById('updatePlaca').value;
  const newPlate = document.getElementById('novaPlaca').value;
  const data = await fetchData(`update/${oldPlate}`, 'PUT', { plate: newPlate });
  document.getElementById('update').textContent = JSON.stringify(data, null, 2);
}

async function gerarRelatorio() {
  const data = await fetchData('report');
  document.getElementById('relatorio').textContent = JSON.stringify(data, null, 2);
}
