const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, prefix } = require('./maoConf.json');
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./maoCmd').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./maoCmd/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log(`✅ MaoMao aktif sebagai ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  await maomao(message);
});

async function maomao(message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command || typeof command.maomao !== 'function') return;

  try {
    await command.maomao({ message, args });
  } catch (err) {
    console.error(err);
    message.reply('❌ Terjadi kesalahan saat menjalankan command.');
  }
}

client.login(token);