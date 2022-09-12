import { REST, Routes, SlashCommandBuilder } from "discord.js";

const commands = [
    new SlashCommandBuilder()
        .setName("cry")
        .setDescription("Gonna cry?")
        .addUserOption((option) =>
            option.setName("username").setDescription("who?").setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("assist")
        .setDescription("You following to assist?"),
    new SlashCommandBuilder().setName("roll").setDescription("Roll a dice!"),
];

const { DISCORD_KEY } = process.env;

const rest = new REST({ version: "10" }).setToken(DISCORD_KEY as string);

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
