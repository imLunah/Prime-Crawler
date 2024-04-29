use strict;
use warnings;
use WWW::Mechanize;
use HTML::TreeBuilder;
use JSON;

# Read URL from command-line argument
my $url = shift @ARGV;
die "Usage: $0 <URL>\n" unless $url;

# Create a new instance of WWW::Mechanize
my $mech = WWW::Mechanize->new();

# Retrieve the page
$mech->get($url);

# Initialize hash to store scraped data
my %data;

# Check if the page was retrieved successfully
if ($mech->success()) {
    # Extract information from the page
    my $content = $mech->content();

    # Extract title
    if ($content =~ m/<span id="productTitle" class="a-size-large product-title-word-break">(.*?)<\/span>/i) {
        $data{'title'} = $1;
    }

    # Extract reviews
    if ($content =~ m/<span id="acrCustomerReviewText" class="a-size-base">(.*?)<\/span>/i) {
        $data{'reviews'} = $1;
    }

    # Extract price
    if ($content =~ m/<span class="a-price[^>]*>\s*<span[^>]*>\$([\d.]+)<\/span>/i) {
        $data{'price'} = $1;
    }


    # Extract image URL using HTML parsing
    my $tree = HTML::TreeBuilder->new();
    $tree->parse($content);
    my $image_url = $tree->look_down(id => 'landingImage')->attr('src');
    $data{'image_url'} = $image_url if $image_url;


    # Extract "About this item" section
    if ($content =~ m/<ul class="a-unordered-list a-vertical a-spacing-mini">(.*?)<\/ul>/is) {
        my $about_this_item_html = $1;
        my @about_this_item;
        while ($about_this_item_html =~ m/<span class="a-list-item">(.*?)<\/span>/g) {
            my $about_this_item_text = $1;
            $about_this_item_text =~ s/<[^>]+>//g; # Remove HTML tags
            $about_this_item_text =~ s/\s+/ /g;     # Remove extra spaces
            push @about_this_item, $about_this_item_text;
        }
        $data{'about_this_item'} = \@about_this_item if @about_this_item;
    }
}

# Convert data hash to JSON
my $json = encode_json \%data;
print $json;
