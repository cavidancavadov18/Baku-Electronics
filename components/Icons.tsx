export function ShopIcon({ name }: { name: "compare" | "cart" | "heart" | "user" }) {
  if (name === "compare") {
    return (
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" aria-hidden="true">
        <path d="M6.45443 16.25C4.62109 16.25 3.12109 14.6429 3.12109 12.6786C3.12109 11.0714 5.28776 5.44643 5.70443 4.28571C5.78776 3.92857 6.12109 3.75 6.45443 3.75C6.78776 3.75 7.12109 3.92857 7.20443 4.28571C7.62109 5.44643 9.78776 11.0714 9.78776 12.6786C9.78776 14.6429 8.28776 16.25 6.45443 16.25ZM6.45443 7.05357C5.62109 9.46429 4.78776 11.9643 4.78776 12.6786C4.78776 13.6607 5.53776 14.4643 6.45443 14.4643C7.37109 14.4643 8.12109 13.6607 8.12109 12.6786C8.12109 11.9643 7.28776 9.46429 6.45443 7.05357ZM19.7878 16.25C17.9544 16.25 16.4544 14.6429 16.4544 12.6786C16.4544 11.0714 18.6211 5.44643 19.0378 4.28571C19.1211 3.92857 19.4544 3.75 19.7878 3.75C20.1211 3.75 20.4544 3.92857 20.5378 4.28571C20.9544 5.44643 23.1211 11.0714 23.1211 12.6786C23.1211 14.6429 21.6211 16.25 19.7878 16.25ZM19.7878 7.05357C18.9544 9.375 18.1211 11.9643 18.1211 12.6786C18.1211 13.6607 18.8711 14.4643 19.7878 14.4643C20.7044 14.4643 21.4544 13.6607 21.4544 12.6786C21.4544 11.9643 20.6211 9.46429 19.7878 7.05357Z" fill="currentColor" />
        <path d="M19.7878 5.875H6.45443C5.95443 5.875 5.62109 5.45 5.62109 4.8125C5.62109 4.175 5.95443 3.75 6.45443 3.75H19.7878C20.2878 3.75 20.6211 4.175 20.6211 4.8125C20.6211 5.45 20.2878 5.875 19.7878 5.875Z" fill="currentColor" />
        <path d="M12.9336 21.25C12.2961 21.25 11.8711 20.9 11.8711 20.375V4.625C11.8711 4.1 12.2961 3.75 12.9336 3.75C13.5711 3.75 13.9961 4.1 13.9961 4.625V20.375C13.9961 20.9 13.5711 21.25 12.9336 21.25Z" fill="currentColor" />
        <path d="M18.1211 21.25H8.12109C7.62109 21.25 7.28776 20.8864 7.28776 20.3409C7.28776 19.7955 7.62109 19.4318 8.12109 19.4318H18.1211C18.6211 19.4318 18.9544 19.7955 18.9544 20.3409C18.9544 20.8864 18.6211 21.25 18.1211 21.25ZM8.95443 13.0682H3.95443C3.45443 13.0682 3.12109 12.7046 3.12109 12.1591C3.12109 11.6137 3.45443 11.25 3.95443 11.25H8.95443C9.45443 11.25 9.78776 11.6137 9.78776 12.1591C9.78776 12.7046 9.45443 13.0682 8.95443 13.0682ZM22.2878 13.0682H17.2878C16.7878 13.0682 16.4544 12.7046 16.4544 12.1591C16.4544 11.6137 16.7878 11.25 17.2878 11.25H22.2878C22.7878 11.25 23.1211 11.6137 23.1211 12.1591C23.1211 12.7046 22.7878 13.0682 22.2878 13.0682Z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "cart") {
    return (
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" aria-hidden="true">
        <path d="M3.62061 3.38533L5.78727 3.76033L6.7904 15.7114C6.87061 16.6874 7.68623 17.4364 8.6654 17.4332H20.0289C20.9633 17.4353 21.756 16.7478 21.8883 15.8228L22.8769 8.99158C22.9873 8.22804 22.4571 7.51971 21.6946 7.40929C21.6279 7.39991 6.13519 7.39471 6.13519 7.39471" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.4702 11.2446H18.3588" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" d="M8.20924 21.0443C8.52279 21.0443 8.77591 21.2984 8.77591 21.6109C8.77591 21.9245 8.52279 22.1786 8.20924 22.1786C7.8957 22.1786 7.64258 21.9245 7.64258 21.6109C7.64258 21.2984 7.8957 21.0443 8.20924 21.0443Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path fillRule="evenodd" d="M19.9602 21.0443C20.2738 21.0443 20.5279 21.2984 20.5279 21.6109C20.5279 21.9245 20.2738 22.1786 19.9602 22.1786C19.6467 22.1786 19.3936 21.9245 19.3936 21.6109C19.3936 21.2984 19.6467 21.0443 19.9602 21.0443Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg width="26" height="25" viewBox="0 0 26 25" fill="none" aria-hidden="true">
        <path fillRule="evenodd" d="M3.8942 12.0816C2.77649 8.59201 4.08274 4.60347 7.74628 3.42326C9.67336 2.80138 11.8004 3.16805 13.4025 4.37326C14.9182 3.20138 17.1234 2.80555 19.0484 3.42326C22.7119 4.60347 24.0265 8.59201 22.9098 12.0816C21.1702 17.6128 13.4025 21.8733 13.4025 21.8733C13.4025 21.8733 5.69211 17.6774 3.8942 12.0816Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17.5688 6.97917C18.6834 7.33959 19.4709 8.33438 19.5657 9.50209" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="15" height="20" viewBox="0 0 15 20" fill="none" aria-hidden="true">
      <path d="M1 16.9231C1 13.6519 3.65185 11 6.92308 11H8.07692C11.3481 11 14 13.6519 14 16.9231C14 18.0701 13.0701 19 11.9231 19H3.07692C1.92987 19 1 18.0701 1 16.9231Z" stroke="currentColor" strokeWidth="2" />
      <rect x="4" y="1" width="7" height="7" rx="3.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Icon({ name }: { name: "grid" | "search" | "compare" | "cart" | "heart" | "user" | "menu" | "shield" | "clock" | "truck" | "card" | "chat" }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true as const };
  if (name === "grid") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16 l5 5" />
      </svg>
    );
  }
  if (name === "compare") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="16" rx="1" />
        <rect x="14" y="4" width="6" height="16" rx="1" />
      </svg>
    );
  }
  if (name === "cart") {
    return (
      <svg {...common}>
        <path d="M4 6 h2 l2 11 h10 l2-7 H8" />
        <circle cx="10" cy="20" r="1.4" fill="currentColor" />
        <circle cx="17" cy="20" r="1.4" fill="currentColor" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg {...common}>
        <path d="M12 19 s-7-4.4-7-9 a4 4 0 0 1 7-2 a4 4 0 0 1 7 2 c0 4.6-7 9-7 9z" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19 c1.5-3 3.8-4.5 7-4.5 s5.5 1.5 7 4.5" />
      </svg>
    );
  }
  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7 h16 M4 12 h16 M4 17 h16" />
      </svg>
    );
  }
  if (name === "shield") return <svg {...common}><path d="M12 3 l7 3 v6 c0 4.5-3 7-7 9 c-4-2-7-4.5-7-9 V6 z" /></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="8" /><path d="M12 8 v5 l3 2" /></svg>;
  if (name === "truck") return <svg {...common}><path d="M3 7 h11 v8 H3 z M14 10 h4 l3 3 v2 h-7" /><circle cx="7" cy="17.5" r="1.4" /><circle cx="17" cy="17.5" r="1.4" /></svg>;
  if (name === "card") return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10 h18" /></svg>;
  return (
    <svg {...common}>
      <path d="M5 16 c0-4 3-7 7-7 s7 3 7 7" />
      <circle cx="9" cy="11" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}
