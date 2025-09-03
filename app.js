import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { saveContact } from './feature.js';


yargs(hideBin(process.argv)).command({
  command: 'add',
  describe: 'Menambahkan kontak baru',
  builder: {
    nama: {
      describe: 'Nama Lengkap',
      demandOption: true,
      type: 'string'
    },
    umur: {
      describe: 'Umur',
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
    saveContact(argv.nama, argv.umur, argv.email);
    console.log(saveContact);
  }
})
.help()
.parse()
