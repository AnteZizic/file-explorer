const truncateText = (text: string) => {
    return text.length > 35
        ? text.slice(0, 25) + '...' + text.slice(text.length - 10, text.length + 1)
        : text;
};

export { truncateText };
