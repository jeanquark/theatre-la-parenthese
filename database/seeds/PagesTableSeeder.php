<?php

use Illuminate\Database\Seeder;
use App\Page;

class PagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // factory(App\Content::class, 5)->create();

        $pages = [
            [
                'title' => 'Accueil',
                'slug' => 'accueil',
                'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac pretium ligula, a condimentum nulla. Pellentesque feugiat laoreet justo, ut tempor sem varius eget. In tellus velit, posuere eu bibendum ac, commodo ut tortor. Sed finibus ligula ac gravida venenatis. Proin nisl odio, lobortis feugiat turpis ut, tristique accumsan risus. Nunc convallis dolor id sodales gravida. Ut aliquam odio et sem suscipit convallis. Duis feugiat sagittis nisl quis accumsan.</p>
                <p class="text-center"><img src="https://picsum.photos/id/237/600/300" /></p>
                <p>Quisque eu justo quis mauris luctus lacinia. Aliquam commodo diam ut venenatis blandit. Donec ac nisi eros. Phasellus sagittis leo tortor, ac finibus ipsum volutpat porta. Mauris aliquet ipsum eu faucibus vestibulum. Phasellus facilisis magna a dolor sodales, eget porttitor lectus convallis. In eget bibendum lectus. Maecenas nec mollis dui. Praesent sagittis sed ligula pharetra gravida. Integer sit amet aliquet nisl, in commodo nunc. Ut dictum nisl ac ipsum elementum venenatis. Morbi odio metus, pulvinar nec rutrum ut, viverra non nisi. Sed vitae dolor eu nibh malesuada tempus sed dignissim nisi. Nullam ut venenatis nisl. Cras elementum enim ligula, a malesuada turpis convallis quis. Nunc ligula purus, bibendum auctor tortor vel, mollis iaculis libero.</p>
                <p>Nam posuere lacinia nulla. Nulla vel placerat felis. Praesent sed urna erat. Fusce faucibus, massa in luctus interdum, libero lorem convallis nibh, et gravida purus tortor vitae leo. Pellentesque sed mauris in urna malesuada congue sit amet et sem. In dui nunc, faucibus ac varius sit amet, rutrum in tortor. Nullam sem quam, fermentum at accumsan sed, dignissim eget tellus.</p>'

            ],
            [
                'title' => 'Qui sommes-nous',
                'slug' => 'qui-sommes-nous',
                'content' => '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac pretium ligula, a condimentum nulla. Pellentesque feugiat laoreet justo, ut tempor sem varius eget. In tellus velit, posuere eu bibendum ac, commodo ut tortor. Sed finibus ligula ac gravida venenatis. Proin nisl odio, lobortis feugiat turpis ut, tristique accumsan risus. Nunc convallis dolor id sodales gravida. Ut aliquam odio et sem suscipit convallis. Duis feugiat sagittis nisl quis accumsan.</p>
                <p class="text-center"><img src="https://picsum.photos/id/237/600/300" /></p>
                <p>Quisque eu justo quis mauris luctus lacinia. Aliquam commodo diam ut venenatis blandit. Donec ac nisi eros. Phasellus sagittis leo tortor, ac finibus ipsum volutpat porta. Mauris aliquet ipsum eu faucibus vestibulum. Phasellus facilisis magna a dolor sodales, eget porttitor lectus convallis. In eget bibendum lectus. Maecenas nec mollis dui. Praesent sagittis sed ligula pharetra gravida. Integer sit amet aliquet nisl, in commodo nunc. Ut dictum nisl ac ipsum elementum venenatis. Morbi odio metus, pulvinar nec rutrum ut, viverra non nisi. Sed vitae dolor eu nibh malesuada tempus sed dignissim nisi. Nullam ut venenatis nisl. Cras elementum enim ligula, a malesuada turpis convallis quis. Nunc ligula purus, bibendum auctor tortor vel, mollis iaculis libero.</p>
                <p>Nam posuere lacinia nulla. Nulla vel placerat felis. Praesent sed urna erat. Fusce faucibus, massa in luctus interdum, libero lorem convallis nibh, et gravida purus tortor vitae leo. Pellentesque sed mauris in urna malesuada congue sit amet et sem. In dui nunc, faucibus ac varius sit amet, rutrum in tortor. Nullam sem quam, fermentum at accumsan sed, dignissim eget tellus.</p>'
            ]
        ];

        foreach ($pages as $page) {
            Page::create($page);
        }
    }
}
