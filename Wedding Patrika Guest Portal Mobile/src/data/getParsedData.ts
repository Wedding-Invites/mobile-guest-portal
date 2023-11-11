export default function getParsedData(data: any, category: string) {
    if (data && data.length > 0) {
        const featureData = data.find((item: any) => item.category === category);
        return featureData;
    }
    return null
}