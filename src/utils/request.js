export async function request(url, method = 'GET', data = null) {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const res = await fetch(url, {
            method,
            credentials: 'include',
            headers,
            body: method !== 'GET' ? JSON.stringify(data) : undefined
        });

        if (!res.ok) {
            return { error: `HTTP error ${res.status}`, result: null };
        }

        const result = await res.json();
        console.log('Requesting:', url);
        return { error: null, result };
    } catch (e) {
        return { error: e.message || 'error', result: null };
    }
}