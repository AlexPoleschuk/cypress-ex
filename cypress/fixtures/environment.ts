import baseUrlJson from "./baseUrl.json";

enum EnvType {
    PRODUCTION = "production",
    STAGE = "stage",
    CUSTOM = "custom",
}

const baseOrigin = {
    production: "https://www.citilink.ru/",
    stage: "https://www.citilink.stage.citilink.lt/",
};

function getBaseUrlByEnv(env) {
    switch (env) {
        case EnvType.CUSTOM:
            return baseUrlJson.url;
        case EnvType.STAGE:
            return baseOrigin.stage;
        case EnvType.PRODUCTION:
            return baseOrigin.production;
        default:
            return baseOrigin.stage;
    }
}

export { baseOrigin, getBaseUrlByEnv, EnvType };
