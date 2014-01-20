var irc = require('irc'),
    config = require('./config'),
    diceroll = require('./diceroll'),
    coinflip = require('./coinflip');

var bot = new irc.Client(config.server, config.nick, config);

bot.addListener('error', function (message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

bot.addListener('message', function (from, to, message) {
    console.log('%s => %s: %s', from, to, message);

    // we don't want any bot wars
    if (from.match('D-3PO') || from.match('Dev-3PO')) 
        return;

    // channel message
    if (to.match(/^[#&]/)) {
        if (message.match(diceroll.expression)) {
            bot.say(to, diceroll.parse(message));
        } else  if (message.match(coinflip.expression)) {
            bot.say(to, coinflip.flip());
        }
    }

    // private message
    /*if (to.match(config.nick)) {
        if (message.match(diceroll.expression)) {
            bot.say(from, diceroll.parse(message));
        } else  if (message.match(coinflip.expression)) {
            bot.say(to, coinflip.flip());
        }
    }*/
});