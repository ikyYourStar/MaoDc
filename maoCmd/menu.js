const { prefix } = require('../maoConf.json');

module.exports = {
  name: "menu",
  description: "Menampilkan semua fitur yang tersedia",
  
  async maomao({ message }) {
    const menu = `
🧩 **Daftar Fitur MaoMao Bot**:
> 📌 \`${prefix}menu\` - Menampilkan semua fitur
> 👋 \`halo\` - Menyapa MaoMao

🔧 Prefix saat ini: \`${prefix}\`
`;
    message.reply(menu);
  }
};