export const formatDate = (data) => {
    const date = new Date(data);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    const dateFormat = year + '-' + month + '-' + day;
    return dateFormat;
};
