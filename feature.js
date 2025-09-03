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

const loadContact = () => {
    const file = fs.readFileSync('./data/contacts.json', 'utf-8')
    const datas = JSON.parse(file)
    return datas
}

export const saveContact = (nama, noHP, email) => {
    const data = {nama, noHP, email}
    const datas = loadContact()

    const duplikat = datas.find((data) => data.nama === nama)
    if (duplikat){
        console.log(chalk.red.inverse.bold(`Kontak dengan nama ${nama} sudah ada!, Gunakan nama lain`));
        return false
    }

    if (email && !validator.isEmail(email)){
        console.log(chalk.red.inverse.bold(`Email yang anda masukkan tidak valid!`));
        return false
    }

   if (noHP < 0) {
       console.log(chalk.red.inverse.bold(`noHP tidak boleh negatif!`));
       return false;
   }

    datas.push(data)

    fs.writeFileSync('./data/contacts.json', JSON.stringify(datas))
    console.log(chalk.green.inverse.bold('✔ Data kontak berhasil disimpan!'));
    console.log(chalk.blue('------------------------------'));
    console.log(chalk.yellow(`Nama: ${nama}`));
    console.log(chalk.yellow(`noHP: ${noHP}`));
    if (email) {
        console.log(chalk.yellow(`Email: ${email}`));
    }
    console.log(chalk.blue('------------------------------'));
}

export const listContact = () => {
    const datas = loadContact()
    console.log(chalk.cyan.inverse.bold('Daftar Kontak'));
    if (datas.length === 0) {
        console.log(chalk.yellow('Tidak ada kontak ditemukan.'));
        return;
    }
    datas.forEach((data, i) => {
        console.log(chalk.yellow(`${i + 1}. ${data.nama} <${data.noHP}> ${data.email ? `(${data.email})` : ''}`));
        console.log(chalk.blue('------------------------------'));
    });
}

export const detailContact = (nama)=>{
    const datas = loadContact()
    const data = datas.find((data) => data.nama.toLowerCase() === nama.toLowerCase())

    if(!data){
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan!!`));
        return false
    }

    console.log(chalk.cyan.inverse.bold('Detail Kontak'));
    console.log(chalk.blue('------------------------------'));
    console.log(chalk.yellow(`Nama: ${data.nama}`));
    if (data.email) {
        console.log(chalk.yellow(`Email: ${data.email}`));
    }
    console.log(chalk.yellow(`No. HP: ${data.noHP}`));
    console.log(chalk.blue('------------------------------'));

}

export const deleteContact = (nama) => {
    const datas = loadContact()
    const newDatas = datas.filter((data) => data.nama.toLowerCase() !== nama.toLowerCase())

    if (datas.length === newDatas.length) {
        console.log(chalk.red.inverse.bold(`${nama} Tidak ditemukan!!`));
        return false
    }

    fs.writeFileSync('./data/contacts.json', JSON.stringify(newDatas))
    console.log(chalk.green.inverse.bold(`✔ Kontak ${nama} berhasil dihapus!`));
}
