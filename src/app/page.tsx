"use client";

import { useState } from "react";
import styles from "./page.module.css";

type AudioItem = {
  url: string;
  image: string;
  caption: string;
  sectionTitle: string;
};

const AUDIO_ITEMS: AudioItem[] = [
  {
    url: "https://www.youtube.com/watch?v=dnATDyulsZI",
    image: "/images/doutaku.jpg",
    caption: "銅鐸の音",
    sectionTitle: "文字がない時代",
  },
  {
    url: "null",
    image: "/images/sample2.jpg",
    caption: "サンプル音声 2",
    sectionTitle: "文字の壁を、音が越える時代",
  },
  {
    url: "null",
    image: "/images/sample3.jpg",
    caption: "サンプル音声 3",
    sectionTitle: "電気が音を放送に変える時代",
  },
];

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      {/* ページ上部のタイトル画像 */}
      <img src="/title-y2.png" alt="Page Title" className={styles.headerImage} />

      <h1 className={styles.title}>Audio Player Gallery</h1>

      <div className={styles.cardRow}>
        {AUDIO_ITEMS.map((item, idx) => (
          <div key={idx} className={styles.card}>
            <h2 className={styles.sectionTitle}>{item.sectionTitle}</h2>
            <img src={item.image} alt={item.caption} className={styles.image} />
            <p className={styles.caption}>{item.caption}</p>
            <button
              className={`${styles.linkButton} ${
                activeIndex === idx ? styles.active : ""
              }`}
              onClick={() => setActiveIndex(idx)}
            >
              音声を再生
            </button>
          </div>
        ))}
      </div>

      <div className={styles.playerWrapper}>
        {activeIndex !== null && (
          <iframe
            className={styles.hiddenPlayer}
            src={`${AUDIO_ITEMS[activeIndex].url}?autoplay=1`}
            title="YouTube audio player"
            allow="autoplay"
          />
        )}
      </div>
    </div>
  );
}