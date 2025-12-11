const getRequiredEnvVar = (name: string): string => {
    const value = process.env[name];

    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(
            `Environment variable "${name}" is required but not set. ` +
                `Set it in your environment configuration (e.g., .env.local).`
        );
    }

    return value.trim();
};

export default getRequiredEnvVar;
