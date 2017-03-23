$(document).ready(function(){
    
// FUNKCJE
    
    // losowy numer ID
    
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    
    // funkcja do tworzenia kolumny
    
    function Column(name) {
        var self = this; // przyda się dla funkcji zagnieżdżonych

        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            
            // tworzenie elementów kolumn
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
            
            
            // podpinanie zdarzeń
            $columnDelete.click(function() {
                self.removeColumn();
            });

            $columnAddCard.click(function(event) {
                self.addCard(new Card(prompt("Wpisz nazwę karty")));
            });
            
            // konstruowanie elementu kolumny
            $column.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);
            
            // zwracanie powstałej kolumny
            return $column;
            
        }
    }
    
    // Prototyp do klasy Column
    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    };
    
    
    // funkcja do tworzenia kart
    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            
            // tworzenie nowej karty
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            
            // podpinanie zdarzeń
            $cardDelete.click(function(){
                self.removeCard();
            });
            
            // Zwracanie karty
            $card.append($cardDelete)
                .append($cardDescription);
            
            
            return $card;            
        }
    }
    
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }
    
    
    var board = {
        name: 'Tablica Kanban',
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        $element: $('#board .column-container')
    };
    

    function initSortable() {
        $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
    }
    
    $('.create-column')
    .click(function(){
        var name = prompt('Wpisz nazwę kolumny');
        var column = new Column(name);
        board.addColumn(column);
    });
    
});