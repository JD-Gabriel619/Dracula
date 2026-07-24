// src/modules/nsfw/utils/ageGate.js
export function createAgeGateModal() {
    return {
        customId: 'nsfw_age_gate',
        title: '🔞 Age Verification',
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 4,
                        customId: 'age_confirmation',
                        label: 'Type "I am 18+"',
                        style: 1,
                        required: true,
                        minLength: 5,
                        maxLength: 20
                    }
                ]
            }
        ]
    };
}

export function verifyAgeGate(input) {
    const text = input.toLowerCase().trim();
    return text.includes('18') || text.includes('eighteen') || text.includes('adult');
}