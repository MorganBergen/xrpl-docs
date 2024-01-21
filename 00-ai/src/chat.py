'''
    @Author: Morgan Bergen
    @Date: 2022-08-02 07:58:00
    @Description: Chat with GPT-3 via command line interface.
    
    @goal

    is to eventually have a chatbot that can be used into a discord bot
    currently we have src/index.js which contains this functionality

    require('dotenv').config();

    const {Client, IntentsBitField} = require('discord.js');

    const client = new Client({
    // intents is set of permissions bot can use
    // more info on discord develop intent site
    intents : [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
    });

    client.on('ready', (c) => {
        console.log(`${c.user.tag} is online`);
    });

    client.on('messageCreate', (msg) => {

        if (msg.author.bot){
            return;
        }

        if (msg.content === 'ping') {
            msg.reply('pong');
    }

        if (msg.content === 'what is xrp?') {
            msg.reply('XRP is the native cryptocurrency of the XRP Ledger. 
            All accounts in the XRP Ledger can send XRP among one another 
            and must hold a minimum amount of XRP as a reserve. XRP can be 
            sent directly from any XRP Ledger address to any other. This 
            helps make XRP a convenient bridge currency.');
        }
    });

    // discord bot token password
    client.login(process.env.TOKEN);
'''

import os
import sys
import constants
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator

os.environ['OPENAI_API_KEY'] = constants.APIKEY

query = sys.argv[1]
print(query)

loader = TextLoader('data.txt');

index = VectorstoreIndexCreator().from_loaders([loader])

print(index.query(query))



