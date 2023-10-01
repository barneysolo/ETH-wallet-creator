const fs = require('fs');
const { Web3 } = require('web3');
const readline = require('readline');

const ethereumNodeUrl = 'https://eth.llamarpc.com';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const web3 = new Web3(ethereumNodeUrl);

async function createWalletAndCheckBalance() {
  try {
    const wallet = web3.eth.accounts.create();
    const address = wallet.address;
    const balance = await web3.eth.getBalance(address);
    const etherBalance = web3.utils.fromWei(balance, 'ether');

    const txCount = await web3.eth.getTransactionCount(address);

    if (txCount > 0 && parseFloat(etherBalance) > 0) {
      const dataToSave = `${wallet.privateKey}|${address}|${txCount}|${etherBalance} ETH\n`;

      fs.appendFile('privatekey.txt', dataToSave, (err) => {
        if (err) throw err;
        console.log(`Data disimpan di privatekey.txt: ${dataToSave}`);
      });
    } else {
      console.log(`Alamat Ethereum: ${address}`);
      console.log('Tidak ada transaksi atau saldo 0.');
    }
  } catch (error) {
    console.error(`Terjadi kesalahan: ${error.message}`);
  }
}

async function checkWalletBalance() {
  rl.question('Masukkan alamat wallet yang ingin diperiksa: ', async (address) => {
    try {
      const balance = await web3.eth.getBalance(address);
      const etherBalance = web3.utils.fromWei(balance, 'ether');
      console.log(`Saldo wallet ${address}: ${etherBalance} ETH`);
      rl.close();
    } catch (error) {
      console.error(`Terjadi kesalahan: ${error.message}`);
      rl.close();
    }
  });
}

async function main() {
  rl.question('Pilih opsi:\n1. Periksa status node\n2. Lanjut membuat wallet\n3. Periksa saldo wallet\nPilihan Anda: ', async (answer) => {
    if (answer === '1') {
      // Pilihan 1: Periksa status node
      // Lakukan pengecekan status node di sini
      console.log('Melakukan pengecekan status node...');
      // Simulasi pengecekan status node (gunakan kode yang sesuai)
      setTimeout(() => {
        console.log('Status node: Normal');
        rl.close();
      }, 3000); // Simulasi pengecekan selama 3 detik
    } else if (answer === '2') {
      // Pilihan 2: Lanjut membuat wallet dan melanjutkan kembali
      while (true) {
        await createWalletAndCheckBalance();
      }
    } else if (answer === '3') {
      // Pilihan 3: Periksa saldo wallet
      checkWalletBalance();
    } else {
      console.log('Pilihan tidak valid.');
      rl.close();
    }
  });
}

// Memulai proses dengan menanyakan opsi
main();
