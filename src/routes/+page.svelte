<script lang="ts">
	import { onMount } from "svelte";
    import {io} from "$lib/webSocketConnection"
	import type { PageServerData } from "./$types";
	import { enhance } from "$app/forms";

    export let data: PageServerData
    let messages: Array<any> = [];
    let messageInput: string
    let sendMessageButton: HTMLButtonElement
    onMount(() => {
        if(data.chats)
            messages = data.chats.map(chat => {
                return {message: chat.message,
                from: chat.username}
            })
        io.on("connected", msg => {
            console.log(msg)
        })
        io.emit("user:connection", {
            username: data.user.username
        })
        io.on("newmsg", msg => {
            
            messages = [...messages, msg]
        })
    })

</script>



<div class="flex-container">
    <div class="container" style="position: relative; min-height: 100vh">
        <h1>Welcome to chat</h1>
        <div class="container">
            <ul>
                {#each messages as message}
                    <li>
                        <div class="message-header">
                            <img src={`https://robohash.org/${message.from}.png?set=set=4&size=100x100`} alt={`${message.from}'s display picture'`}>
                            <h3>{message.from.toUpperCase()}</h3>
                        </div>
                        <p class="message">{message.message}</p>
                    </li>
                {:else}
                 <p>There is no messages</p>
                {/each}
            </ul>
        </div>
        <form action="" method="post" class="message-form" use:enhance={({data}) => {
            data = {...data, }
        }}>
            <input type="text" name="message" placeholder="Type your message here!" style="max-width: 65%;" bind:value={messageInput}>
            <button type="button" style="max-width: 30%;" on:click={() => {
                io.emit("message", {
                    from: data.user.username,
                    message: messageInput,
                    time: new Date().toLocaleTimeString()
                })
                sendMessageButton.click()
            }}>Send</button>
            <button type="submit" style="visibility: hidden;" bind:this={sendMessageButton}>Submit</button>
        </form>
    </div>
</div>

<style>
    .flex-container{
        display: flex;
        align-items: center;
        max-height: 100vh;
    }
    
    .message-form{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    ul li{
        display: flex;
        flex-direction: column;
        list-style-type: none;
    }
    
    .message-header{
        display: flex;
        max-width: 50%;
        align-items: center;
        height: 100%;
    }
    .message-header img{
        width: 45px;
        border-radius: 50%;
        border: 1px solid white;
    }
    .message-header h3{
        margin-left: .5rem;
        font-weight: normal;
        font-size: 20px;
        margin-bottom: 0;
    }
    
    .message{
        margin-top: .5rem;
    }
</style>