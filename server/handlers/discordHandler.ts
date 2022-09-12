import { ActivityType, Client, GatewayIntentBits } from "discord.js";
import { DiscordUsernameOptions } from "lib/types";

const { DISCORD_KEY } = process.env;

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

    client.user!.setActivity("sitting here and taking it...", {
        type: ActivityType.Competing,
    });
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    switch (interaction.commandName) {
        case "assist": {
            await interaction.reply(
                "https://www.youtube.com/watch?v=CRzfZu0GH14"
            );
            break;
        }
        case "cry": {
            const message = interaction.options
                .data[0] as DiscordUsernameOptions;
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
            break;
        }
        case "roll": {
            const diceFaces = [
                `\u2680`,
                `\u2681`,
                `\u2682`,
                `\u2683`,
                `\u2684`,
                `\u2685`,
            ];
            interaction.reply(
                `${diceFaces[Math.floor(Math.random() * 6) + 1]}`
            );
        }
    }
});

client.login(DISCORD_KEY as string).catch((e) => {
    console.log(`ERROR: ${e.toString()}`);
});
