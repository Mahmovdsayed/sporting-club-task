import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 80,
                    color: "red",
                    background: "white",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                Sporting Club Task
            </div>
        ),
        {
            ...size,
        }
    );
}
