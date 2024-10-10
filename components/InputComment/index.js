import { useState, useEffect } from 'react';
import styles from '../../styles/Pages.module.css';

const InputComment = () => {
  // Устанавливаем дефолтное значение для текста
  const [text, setText] = useState('');

  useEffect(() => {
    // Получаем значение из chrome.storage.sync, если оно там сохранено
    chrome.storage.sync.get(['comment'], (result) => {
      if (result.comment) {
        setText(result.comment); // Устанавливаем значение из хранилища, если оно есть
        console.log('Loaded from storage:', result.comment);
      } else {
        console.log('No comment found in storage, using default:', text);
      }
    });
  }, []); // Пустой массив, чтобы этот эффект выполнился только при монтировании компонента

  const handleChange = async (event) => {
    const newText = event.target.value; // Получаем новое значение из input
    setText(newText); // Обновляем состояние

    try {
      // Сохраняем новое значение в chrome.storage.sync
      await chrome.storage.sync.set({ comment: newText });
      console.log('Saved to storage:', newText);
    } catch (error) {
      console.error('Failed to save to storage', error);
    }

    await new Promise((r) => setTimeout(r, 150)); // Небольшая задержка
  };

  return (
    <>
      <textarea 
        className={styles.code} 
        value={text}  // Используем значение из состояния
        onChange={handleChange}  // Обрабатываем изменения
      />
    </>
  );
};

export default InputComment;
