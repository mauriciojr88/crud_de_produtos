document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os produtos da base de dados
    loadProducts();

    // Função para abrir o formulário de adição de produto
    window.openForm = function () {
        document.getElementById('form-popup').style.display = 'block';
    };

    // Função para fechar o formulário
    window.closeForm = function () {
        document.getElementById('form-popup').style.display = 'none';
        clearForm();
    };

    // Função para limpar o formulário
    function clearForm() {
        document.getElementById('produto-form').reset();
    }

    // Função para enviar o formulário
    window.submitForm = function () {
        var formData = new FormData(document.getElementById('produto-form'));

        fetch('api.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Produto salvo com sucesso!');
                loadProducts();
                closeForm();
            } else {
                alert('Erro ao salvar o produto.');
            }
        });
    };

    // Função para carregar os produtos da base de dados
    function loadProducts() {
        fetch('api.php')
        .then(response => response.json())
        .then(data => {
            var produtosBody = document.getElementById('produtos-body');
            produtosBody.innerHTML = '';

            data.forEach(produto => {
                var row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto.codigo}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.preco}</td>
                    <td>
                        <button onclick="editProduct('${produto.codigo}')">Editar</button>
                        <button onclick="deleteProduct('${produto.codigo}')">Deletar</button>
                    </td>
                `;
                produtosBody.appendChild(row);
            });
        });
    }

    // Função para editar um produto
    window.editProduct = function (codigo) {
        fetch(`api.php?codigo=${codigo}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.getElementById('nome').value = data[0].nome;
                document.getElementById('descricao').value = data[0].descricao;
                document.getElementById('preco').value = data[0].preco;
                openForm();
            } else {
                alert('Produto não encontrado.');
            }
        });
    };

    // Função para deletar um produto
    window.deleteProduct = function (codigo) {
        if (confirm('Tem certeza que deseja deletar este produto?')) {
            fetch(`api.php?codigo=${codigo}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Produto deletado com sucesso!');
                    loadProducts();
                } else {
                    alert('Erro ao deletar o produto.');
                }
            });
        }
    };
});