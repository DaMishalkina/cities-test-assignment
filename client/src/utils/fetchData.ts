export const fetchData = async (url: string) => {
    try {
        let response = await fetch(url);
        if (response.status === 200) {
            return  await response.json();
        }
    } catch (error) {
        console.error(error)
    }
}