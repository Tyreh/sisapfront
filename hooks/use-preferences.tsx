import { useState } from "react";

export const usePreferences = (defaultPreferences: any) => {
    const [preferences, setPreferences] = useState(defaultPreferences);

    const updatePreference = (key: any, value: any) => {
        setPreferences((prev: any) => {
            const updatedPreferences = { ...prev };

            if (value === "" || value === null || value === undefined) {
                // Si el valor está vacío, elimina la preferencia
                delete updatedPreferences[key];
            } else {
                updatedPreferences[key] = value;
            }

            return updatedPreferences;
        });
    };

    return { preferences, setPreferences, updatePreference };
};