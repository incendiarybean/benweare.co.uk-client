import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { DiscordUsernameOptions } from "lib/types";

const DISCORD_TOKEN = process.env.DISCORD_KEY;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.on("ready", () => {
    console.log(
        `[${new Date()}] Discord Bot ${client.user?.tag} has logged in!`
    );

    client.user!.setActivity("in sitting here and taking it...", {
        type: ActivityType.Competing,
    });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
    }

    if (interaction.commandName === "assist") {
        await interaction.reply("https://www.youtube.com/watch?v=CRzfZu0GH14");
    }

    if (interaction.commandName === "cry") {
        const message = interaction.options.data[0] as DiscordUsernameOptions;
        if (message && message.user) {
            interaction.reply({
                content: `${message.user}`,
                embeds: [
                    {
                        image: {
                            url: "https://media3.giphy.com/media/8JZxZgr39TLczSJQoS/giphy.gif",
                        },
                    },
                ],
                allowedMentions: { parse: ["everyone"] },
            });
        }
    }
});

client.login(DISCORD_TOKEN).catch((e) => {
    console.log(`ERROR: ${e.toString()}`);
});
