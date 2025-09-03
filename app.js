import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { saveContact, listContact, detailContact, deleteContact } from './feature.js';


yargs(hideBin(process.argv)).command({
  command: 'add',
  describe: 'Menambahkan kontak baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
    noHP: {
      describe: 'noHP',
      demandOption: true,
      type: 'number'
    },
    email: {
      describe: 'Email',
      demandOption: false,
      type: 'string'
    }
  },
  handler(argv) {
    saveContact(argv.nama, argv.noHP, argv.email);
  }
}).command({
  command: 'list',
  describe: 'Menampilkan list contact nama dan noHP',
  handler() {
    listContact();
  }
}).command({
  command: 'detail',
  describe: 'Menampilkan detail dari kontak yang dicari berdasarkan nama!',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    detailContact(argv.nama)
  }
}).command({
  command: 'delete',
  describe: 'Menghapus kontak yang dicari berdasarkan nama!',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteContact(argv.nama)
  }
})
.demandCommand()
.help()
.parse()
