
export function round(v: number) {
    return v.toFixed(4);
}
export function formatPrice(value: number) {
    if (value >= 1000) {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    }

    if (value >= 1) {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
        }).format(value);
    }

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
    }).format(value);
}

export function formatTimeAgo(date: string) {
    const seconds = Math.floor(
        (Date.now() - new Date(date).getTime()) / 1000
    );

    if (seconds < 60) {
        return `${seconds}s ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days}d ago`;
    }

    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}
