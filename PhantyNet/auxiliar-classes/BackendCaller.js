import BACKEND_URI from "@/constants/BACKEND_URI";

/**
 * Realiza llamadas a la API y devuelve el resultado.
 * @estado LISTO.
 */
export default class BackendCaller {
    /**
     * Identificador de la API.
     */
    static #API_URI = BACKEND_URI + "/api";

    // AUTH ROUTES

    /**
     * Registra un nuevo usuario en el sistema.
     * @param {*} username 
     * @param {*} email 
     * @param {*} password
     * @estado LISTO.
     */
    static async register(username, email, password) {
        try {
            const response = await fetch(this.#API_URI + "/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            username: username,
                            email: email,
                            password: password
                        }
                    )
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    }

    /**
     * Inicia sesión con credenciales de usuario.
     * @param {*} email 
     * @param {*} password 
     * @estado LISTO.
     */
    static async login(email, password) {
        try {
            const response = await fetch(this.#API_URI + "/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            email: email,
                            password: password
                        }
                    )
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
    }

    // POST ROUTES

    /**
     * Subir una nueva publicación.
     * @param {*} token 
     * @param {*} imageData 
     * @param {*} caption 
     * @estado LISTO.
     */
    static async uploadPost(token, imageData, caption) {
        try {
            // Crea un objeto FormData.
            const formData = new FormData();

            // Añade la imagen y el texto del caption al FormData.
            formData.append("image", {  // "image" es el campo que el servidor espera.
                uri: imageData.uri,
                name: imageData.fileName,
                type: `image/${imageData.fileType}`,  // Especificamos el tipo de la imagen.
            });

            formData.append("caption", caption);  // "caption" es el campo de texto

            const response = await fetch(this.#API_URI + "/posts/upload",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    },
                    body: formData // Establece el FormData como cuerpo de la solicitud
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al subir un post:", error);
        }
    }

    /**
     * Obtener el feed de publicaciones.
     * @param {*} token
     * @estado LISTO.
     */
    static async getFeed(token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/feed",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al obtener el feed:", error);
        }
    }

    /**
     * Crear un comentario en un post.
     * @param {*} postID 
     * @param {*} token
     * @estado LISTO.
     */
    static async createComment(content, postID, token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/" + postID + "/comments",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            content: content
                        }
                    )
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al crear comentario:", error);
        }
    }

    /**
     * Eliminar un comentario en un post.
     * @param {*} postID 
     * @param {*} commentID
     * @param {*} token
     * @estado LISTO.
     */
    static async deleteComment(postID, commentID, token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/" + postID + "/comments/" + commentID,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al eliminar comentario:", error);
        }
    }

    /**
     * Obtener un comentario específico.
     * @param {*} commentID
     * @param {*} token
     * @estado LISTO.
     */
    static async getComment(commentID, token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/comments/" + commentID,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al obtener comentario:", error);
        }
    }

    /**
     * Dar like a un post.
     * @param {*} postID 
     * @param {*} token 
     * @estado LISTO.
     */
    static async giveLike(postID, token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/" + postID + "/like",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al dar like:", error);
        }
    }

    /**
     * Quitar el like de un post.
     * @param {*} postID 
     * @param {*} token 
     * @estado LISTO.
     */
    static async deleteLike(postID, token) {
        try {
            const response = await fetch(this.#API_URI + "/posts/" + postID + "/like",
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al quitar like:", error);
        }
    }

    // USER ROUTES

    /**
     * Obtener el perfil de un usuario dado su ID.
     * @param {*} userID 
     * @param {*} token
     * @estado LISTO.
     */
    static async getUserProfile(userID, token) {
        try {
            const response = await fetch(this.#API_URI + "/user/profile/" + userID,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al obtener perfil:", error);
        }
    }

    /**
     * Obtener todos los usuarios.
     * @param {*} token
     * @estado LISTO.
     */
    static async getAllUsers(token) {
        try {
            const response = await fetch(this.#API_URI + "/user/all",
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al obtener perfiles:", error);
        }
    }

    /**
     * Agregar un amigo.
     * @param {*} friendID 
     * @param {*} token
     * @estado LISTO.
     */
    static async addFriend(friendID, token) {
        try {
            const response = await fetch(this.#API_URI + "/user/add-friend/" + friendID,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al agregar amigo:", error);
        }
    }

    /**
     * Eliminar un amigo.
     * @param {*} friendID 
     * @param {*} token
     * @estado LISTO.
     */
    static async removeFriend(friendID, token) {
        try {
            const response = await fetch(this.#API_URI + "/user/remove-friend/" + friendID,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al remover amigo:", error);
        }
    }

    /**
     * Actualizar el perfil del usuario autenticado.
     * @param {*} token 
     * @param {*} newUsername
     * @param {*} newProfilePicture en base 64.
     * @estado LISTO.
     */
    static async editProfile(token, newUsername, newProfilePicture) {
        try {
            const response = await fetch(this.#API_URI + "/user/profile/edit",
                {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            username: newUsername,
                            profilePicture: newProfilePicture
                        }
                    )
                }
            );

            const statusCode = response.status;

            // El resultado no es JSON sino el resultado de tomar JSON como entrada y analizarlo para producir un objeto JavaScript.
            const data = await response.json();

            return { statusCode, data };
        } catch (error) {
            console.error("Error al editar perfil:", error);
        }
    }
}