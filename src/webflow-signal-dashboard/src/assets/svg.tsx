import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

export const TrendIcon: React.FC<IconProps> = (props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
    </svg>
);

export const ActivityPulseIcon: React.FC<IconProps> = (props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#28af60"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
);

export const TrackRecordIcon: React.FC<IconProps> = (props) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#999999"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
    </svg>
);

export const SparklineIcon: React.FC<IconProps> = (props) => (
    <svg
        viewBox="0 0 80 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <defs>
            <linearGradient
                id="sparklineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
            >
                <stop offset="0%" stopColor="#28af60" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#28af60" stopOpacity={1} />
            </linearGradient>
        </defs>

        <path
            d="M 0 24
               L 4.21 21.6
               L 8.42 23.04
               L 12.63 19.2
               L 16.84 20.16
               L 21.05 16.8
               L 25.26 18.24
               L 29.47 14.4
               L 33.68 15.36
               L 37.89 12
               L 42.11 13.44
               L 46.32 9.6
               L 50.53 10.56
               L 54.74 7.2
               L 58.95 8.64
               L 63.16 4.8
               L 67.37 5.76
               L 71.58 2.4
               L 75.79 3.84
               L 80 0"
            stroke="url(#sparklineGradient)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);