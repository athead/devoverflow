"use client";

import Link from "next/link";

import styles from "../styles/404.module.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      router.push(`/?q=${search}`);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>404 - Страница не найдена</h1>
        <p className={styles.description}>
          Извините, но здесь ничего нет. <br />
          Воспользуйтесь поиском или перейдите по ссылкам ниже
        </p>

        <form className={styles.searchForm} onSubmit={onFormSubmit}>
          <input
            type="search"
            className={styles.searchBox}
            placeholder="Поиск вопросов"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <button
            type="submit"
            className={styles.searchFormBtn}
            disabled={submitting}
          >
            Поиск
          </button>
        </form>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/community" className={styles.link}>
            Сообщество
          </Link>
          <Link href="/tags" className={styles.link}>
            Метки
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
