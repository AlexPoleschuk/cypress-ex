export function hideBackgroundRequests() {
    const hide_names = ["fetch", "xhr"];

    const hide_url_parts = [
        'stream.datago.ru',
        'mc.yandex.ru',
        'www.google-analytics.com',
        '*.google-analytics.com',
        '*google-analytics.com',
        'ev.adriver.ru',
        'fga.citilink.ru',
        'ctl-api.exponea.com',
        'vk.com',
        'getrcmx.com',
        'monitoring-front-agent.svc.citilink.lt',
    ];

    Cypress.on("log:changed", (log, interactive) => {
        if (hide_names.indexOf(log.displayName) == -1 || log.alias) return;
        if (!hide_url_parts.some(part => log.url.indexOf(part) > -1)) return;

        const logs = window?.top?.document.querySelectorAll("li.command-name-request");
        if (logs?.length) {
            for (let i = logs.length - 1; i >= 0; i--) {
                const keys = Object.keys(logs[i]);
                const inst_key = keys.find(k => k.search(/^__reactInternalInstance/i) > -1);
                if (!inst_key) { continue; }

                const internal = logs[i][inst_key];
                if (internal?.return?.key == log.id) {
                    logs[i].remove();
                    return;
                }
            }
        }
    });
}
