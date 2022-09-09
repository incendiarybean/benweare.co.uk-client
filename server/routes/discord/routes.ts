import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
    {
        name: "ping",
        description: "Replies with Pong!",
    },
    new SlashCommandBuilder()
        .setName("cry")
        .setDescription("Gonna cry?")
        .addUserOption((option) =>
            option.setName("username").setDescription("who?").setRequired(true)
        ),

    {
        name: "assist",
        description: "You following to assist?",
    },
];

const DISCORD_TOKEN = process.env.DISCORD_KEY;

const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN as string);

const setupBot = async (): Promise<void> => {
    try {
        await rest.put(Routes.applicationCommands("816335957686091876"), {
            body: commands,
        });

        console.log(`[${new Date()}] Discord Bot commands loaded!`);
    } catch (error) {
        console.error(error);
    }
};

setupBot();
