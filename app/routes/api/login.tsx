export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const token = url.searchParams.get("t");
    if (!token) {
        return new Response("No token found", { status: 400 });
    }

    document.cookie = `token=${token}; path=/`;

    return "";
};