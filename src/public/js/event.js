export default function onNavigate(path) {
    return new CustomEvent("onstatechange", {
        detail: { path },
    });
    }
    