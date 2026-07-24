export function createAgeGateModal() {
    return {
        customId: 'nsfw_age_gate',
        title: '🔞 Age Confirmation',
        components: [{
            type: 1,
            components: [{
                type: 4,
                customId: 'age_confirmation',
                label: 'Type "I am 18+" to continue',
                style: 1,
                required: true,
                minLength: 8,
                maxLength: 20
            }]
        }]
    };
}

export function verifyAgeGate(response) {
    const input = response.toLowerCase().trim();
    return input.includes('18') || input.includes('eighteen');
}