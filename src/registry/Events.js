const { CDClient } = require("../Base/CDClient");
const Event = require("../Base/Event");
const { lstatSync, existsSync, readdirSync } = require("fs");
const { log } = require('mustang-log')

/**
 * @param {string} eventsDir 
 * @param {CDClient} client 
 * @param {boolean} customMessageEvent
 */
function Events(eventsDir, client, customMessageEvent) {
    let totalEvents = 0;
    if (!existsSync(`${require.main.path}\\${eventsDir}`)) log('Please make sure your events directory exists.', 'ERROR', true);
    const files = readdirSync(`${require.main.path}\\${eventsDir}`);
    for (const file of files) {
        if (lstatSync(`${require.main.path}\\${eventsDir}\\${file}`).isDirectory())
            totalEvents += Events(`${eventsDir}\\${file}`, client, customMessageEvent);
        else {
            /** @type {Event} */
            const event = require(`${require.main.path}\\${eventsDir}\\${file}`);
            if (event.name === "message" && !customMessageEvent) continue;
            if (event.name === "ready") continue;
            totalEvents += 1;
            client.on(event.name, event.run.bind(null, client));
        }
    }
    return totalEvents;
}

module.exports = Events;