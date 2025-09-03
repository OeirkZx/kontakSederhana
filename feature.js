import fs from 'fs';
import chalk from 'chalk';
import validator from 'validator';

const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

const filePath = './data/contacts.json'
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8')
}

export const saveContact = (nama, umur, email) => {
    const data = {nama, umur, email}
    const file = fs.readFileSync('./data/contacts.json', 'utf-8')
    const datas = JSON.parse(file)

    const duplikat = datas.find((data) => data.nama === nama)
    if (duplikat){
        console.log(chalk.red.inverse.bold(`Kontak dengan nama ${nama} sudah ada!, Gunakan nama lain`));
        return false
    }

    if (email && !validator.isEmail(email)){
        console.log(chalk.red.inverse.bold(`Email yang anda masukkan tidak valid!`));
        return false
    }

   if (umur < 0) {
       console.log(chalk.red.inverse.bold(`Umur tidak boleh negatif!`));
       return false;
   }

    datas.push(data)

    fs.writeFileSync('./data/contacts.json', JSON.stringify(datas))
    console.log(chalk.green.inverse.bold('✔ Data kontak berhasil disimpan!'));
    console.log(chalk.blue('------------------------------'));
    console.log(chalk.yellow(`Nama: ${nama}`));
    console.log(chalk.yellow(`Umur: ${umur}`));
    if (email) {
        console.log(chalk.yellow(`Email: ${email}`));
    }
    console.log(chalk.blue('------------------------------'));
}
