import { defineCliConfig } from "sanity/cli";

import { getRequiredEnvVar } from "@/shared";

/* ===== Environment ===== */
const DATASET_ENV = "NEXT_PUBLIC_SANITY_DATASET";
const PROJECT_ID_ENV = "NEXT_PUBLIC_SANITY_PROJECT_ID";

const dataset = getRequiredEnvVar(DATASET_ENV);
const projectId = getRequiredEnvVar(PROJECT_ID_ENV);

export default defineCliConfig({
    api: {
        projectId,

        dataset,
    },
});
