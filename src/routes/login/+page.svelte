<script>

	import { enhance } from "$app/forms";

</script>
<div class="flex-container">
    <div class="container">
        <h1 style="text-align: center;">Register Yourself to chat</h1>
        <form action="" method="post" use:enhance>
            <label for="username">Username</label>
            <input type="text" name="username" id="username" />
            <label for="password">Password</label>
            <input type="text" name="password" id="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</div>


<style>
    .container{
        max-width: 50%;
        margin: 0 auto;
    }

    .flex-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>