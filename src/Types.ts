export interface sectionConfigInterface {
    system_api_key: string;
}

export interface sessionRegistration {
    organization_user: {
        email: string;
        password: string;
    };
}

export interface headersConfig {
    headers: {
        Authorization: string;
    };
}