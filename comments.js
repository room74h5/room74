// Получаем элементы формы и раздел комментариев
const commentForm = document.getElementById('commentForm');
const commentSection = document.getElementById('commentSection');

// Загрузка комментариев из LocalStorage при загрузке страницы
window.onload = function() {
    loadComments();
};

// Обработчик отправки формы
commentForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем значения из полей формы
    const username = document.getElementById('username').value;
    const commentText = document.getElementById('comment').value;

    if (username && commentText) {
        // Создаём объект комментария
        const comment = {
            username: username,
            comment: commentText,
            timestamp: new Date().toLocaleString()
        };

        // Получаем текущие комментарии из LocalStorage
        let comments = localStorage.getItem('comments');
        comments = comments ? JSON.parse(comments) : [];

        // Добавляем новый комментарий в массив
        comments.push(comment);

        // Сохраняем обновлённый массив комментариев в LocalStorage
        localStorage.setItem('comments', JSON.stringify(comments));

        // Очищаем форму
        commentForm.reset();

        // Перезагружаем секцию комментариев
        loadComments();
    }
});

// Функция загрузки комментариев из LocalStorage
function loadComments() {
    // Очищаем секцию перед загрузкой
    commentSection.innerHTML = '';

    // Получаем комментарии из LocalStorage
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];

    // Отображаем каждый комментарий
    comments.forEach(function(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <strong>${comment.username}</strong> <em>${comment.timestamp}</em><br>
            <p>${comment.comment}</p>
        `;
        commentSection.appendChild(commentDiv);
    });
}
