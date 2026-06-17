export default function auth() {
    return(
        <section>
            <div>
                <h1>Login</h1>
                <form>
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Senha" />
                    <button type="submit">Login</button>
                </form>
                <div>
                    <input type="checkbox" id="checkbox" title="Concordo com os termos de uso" required placeholder="Concordo com os termos de uso" />
                    <span>Não tenho conta quero me <a href="/register">cadastrar</a></span>
                </div>
            </div>
        </section>
    );
}