<script>
  import { theme, themeStorage } from "../store";
  import Icon from "@iconify/svelte";

  function displayDiscordTag() {
    alert("Klay#7053");
  }

  function onThemeChange({ target: { value } }) {
    if (value === "auto") {
      themeStorage.remove();
    } else {
      themeStorage.set(value);
    }
  }
</script>

<!-- macOS dark theme background -->
<div
  style:background="{$theme === "dark" ? "#1e1d27" : ""}"
  style:color="{$theme === "dark" ? "white" : ""}"
  style:display="flex"
  style:flex-direction="column"
  style:height="99vh"
  style:padding="8px">
  <header>
    <nav
      style:display="flex"
      style:justify-content="space-between"
      style:gap="16px">
      <menu class="header-menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
      </menu>
      <menu class="header-menu">
        <li>
          <a href="mailto:kyleerhabor@gmail.com">
            <Icon icon="material-symbols:mail-outline" />
          </a>
        </li>
        <li>
          <a href="https://github.com/KyleErhabor" target="_blank">
            <Icon icon="mdi:github" />
          </a>
        </li>
        <li>
          <a href="https://anilist.co/user/KlayLay/" target="_blank">
            <Icon icon="simple-icons:anilist" />
          </a>
        </li>
        <li>
          <button on:click="{displayDiscordTag}">
            <Icon icon="ic:outline-discord" />
          </button>
        </li>
      </menu>
    </nav>
  </header>

  <main style:margin-bottom="auto">
    <slot class="content"></slot>
  </main>

  <footer
    style:display="flex"
    style:justify-content="space-between">
    <small>
      Copyright &copy; 2022 Kyle Erhabor
    </small>
    <div id="footer-controls">
      <select value="{$themeStorage ?? "auto"}" name="theme" id="theme" on:change="{onThemeChange}">
        <option value="auto">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </footer>
</div>

<style>
  .header-menu {
    display: flex;
    gap: 8px;
    list-style: none;
    padding-inline-start: 0; /* Overrides user agent */
  }
</style>
